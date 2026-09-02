import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { serverEndpoint } from '../../config/config';
import { Modal } from 'react-bootstrap';
import { usePermission } from '../../rbac/userPermissions';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './LinksDashboard.css';

function LinksDashboard() {
    const [errors, setErrors] = useState({});
    const [linksData, setLinksData] = useState([]);
    const navigate = useNavigate();
    const userDetails = useSelector((state) => state.userDetails);

    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const permission = usePermission();

    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(2);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalRecords, setTotalRecords] = useState(0);
    const [sortModel, setSortModel] = useState([
        { field: 'createdAt', sort: 'desc' }
    ]);

    const [formData, setFormData] = useState({
        campaignTitle: "",
        originalUrl: "",
        category: ""
    });

    const handleOpenDeleteModal = (id) => {
        setFormData(prev => ({ ...prev, id }));
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${serverEndpoint}/links/${formData.id}`, {
                withCredentials: true
            });
            await fetchLinks();
            handleCloseDeleteModal();
        } catch (error) {
            setErrors({ message: 'Unable to delete the link, please try again' });
        }
    };

    const handleOpenModal = (isEdit, data = {}) => {
        if (isEdit) {
            setFormData({
                id: data._id,
                campaignTitle: data.campaignTitle,
                originalUrl: data.originalUrl,
                category: data.category
            });
        }

        setIsEdit(isEdit);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        let newErrors = {};
        let isValid = true;
        if (formData.campaignTitle.length === 0) {
            newErrors.campaignTitle = "Campaign Title is mandatory";
            isValid = false;
        }

        if (formData.originalUrl.length === 0) {
            newErrors.originalUrl = "URL is mandatory";
            isValid = false;
        }

        if (formData.category.length === 0) {
            newErrors.category = "Category is mandatory";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validate()) {
            setLoading(true);
            const body = {
                campaign_title: formData.campaignTitle,
                original_url: formData.originalUrl,
                category: formData.category
            };
            const configuration = {
                withCredentials: true
            };
            try {
                let thumbnailUrl = '';
                if (thumbnailFile) {
                    thumbnailUrl = await uploadToCloudinary(thumbnailFile);
                    body.thumbnail = thumbnailUrl;
                }
                if (isEdit) {
                    await axios.put(
                        `${serverEndpoint}/links/${formData.id}`,
                        body, configuration);
                } else {
                    await axios.post(
                        `${serverEndpoint}/links`,
                        body, configuration);
                }

                await fetchLinks();
                setFormData({
                    campaignTitle: "",
                    originalUrl: "",
                    category: ""
                });
                setThumbnailFile(null);
                setPreviewUrl('');
            } catch (error) {
                setErrors({ message: 'Unable to add the Link, please try again' });
            } finally {
                handleCloseModal();
            }
        }
    };

    const uploadToCloudinary = async (file) => {
        const { data } = await axios.post(`${serverEndpoint}/links/generate-upload-signature`, {},
            { withCredentials: true });

        const formData = new FormData();
        formData.append('file', file);
        formData.append('signature', data.signature);
        formData.append('api_key', data.apikey);
        formData.append('timestamp', data.timestamp);

        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${data.cloudName}/image/upload`,
            formData
        );

        return response.data.secure_url;
    };

    const fetchLinks = useCallback(async () => {
        try {
            setLoading(true);

            const sortField = sortModel[0]?.field || 'createdAt';
            const sortOrder = sortModel[0]?.sort || 'desc';

            const params = {
                currentPage: currentPage,
                pageSize: pageSize,
                searchQuery: searchQuery,
                sortField: sortField,
                sortOrder: sortOrder
            };
            const response = await axios.get(`${serverEndpoint}/links`, {
                params: params,
                withCredentials: true
            });
            setLinksData(response.data.links);
            setTotalRecords(response.data.total);
        } catch (error) {
            console.log(error);
            setErrors({ message: 'Unable to fetch links at the moment. Please try again' });
        } finally {
            setLoading(false);
        }
    }, [currentPage, pageSize, searchQuery, sortModel]);

    useEffect(() => {
        fetchLinks();
    }, [fetchLinks]);

    const totalClicks = linksData.reduce((sum, link) => sum + (link.clickCount || 0), 0);

    const columns = [
        {
            field: 'thumbnail', headerName: 'Thumbnail', sortable: false, flex: 1,
            renderCell: (params) => (
                params.row.thumbnail ? (
                    <img src={params.row.thumbnail} alt='thumbnail' className="table-thumbnail-img" />
                ) : (
                    <div className="table-thumb-placeholder">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                    </div>
                )
            ),
        },
        { field: 'campaignTitle', headerName: 'Campaign', flex: 2.2 },
        {
            field: 'originalUrl', headerName: 'Shortened URL', flex: 2.8, renderCell: (params) => {
                const idStr = params.row._id ? params.row._id.slice(-2) : '3b';
                const shortUrl = `https://affiliate++/${idStr}`;
                return (
                    <a href={`${serverEndpoint}/links/r/${params.row._id}`}
                        target='_blank'
                        rel="noopener noreferrer"
                        className="shortened-url-link"
                    >
                        {shortUrl}
                    </a>
                );
            }
        },
        {
            field: 'category', headerName: 'Category', flex: 2, renderCell: (params) => {
                const cat = params.row.category || 'Category';
                let tagType = 'blue';
                if (cat.toLowerCase().includes('dev')) tagType = 'red';
                else if (cat.toLowerCase().includes('camp')) tagType = 'green';
                return (
                    <span className={`category-pill ${tagType}`}>{cat}</span>
                );
            }
        },
        { field: 'clickCount', headerName: 'Clicks', flex: 1 },
        {
            field: 'action', headerName: 'Action', flex: 1.8, sortable: false, renderCell: (params) => (
                <div className="action-buttons-group">
                    {permission.canEditLink && (
                        <button className="action-icon-btn" title="Edit" onClick={() => handleOpenModal(true, params.row)}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </button>
                    )}
                    {permission.canDeleteLink && (
                        <button className="action-icon-btn" title="Delete" onClick={() => handleOpenDeleteModal(params.row._id)}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                    )}
                    {permission.canViewLink && (
                        <button className="action-icon-btn" title="Analytics" onClick={() => navigate(`/analytics/${params.row._id}`)}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                        </button>
                    )}
                </div>
            )
        }
    ];

    return (
        <div className="dashboard-container">
            <div className="container py-4">
                {/* Summary Stats Title */}
                <h2 className="summary-stats-title">Summary Stats</h2>

                {/* 3 Stat Cards Row */}
                <div className="stat-cards-row">
                    <div className="stat-card">
                        <div className="stat-card-accent-border"></div>
                        <div className="stat-icon-box purple">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                            </svg>
                        </div>
                        <div>
                            <div className="stat-card-label">Total Links</div>
                            <div className="stat-card-value">{totalRecords || 24}</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-card-accent-border"></div>
                        <div className="stat-icon-box blue">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="20" x2="18" y2="10"></line>
                                <line x1="12" y1="20" x2="12" y2="4"></line>
                                <line x1="6" y1="20" x2="6" y2="14"></line>
                                <polyline points="6 10 12 4 18 8"></polyline>
                            </svg>
                        </div>
                        <div>
                            <div className="stat-card-label">Total Clicks</div>
                            <div className="stat-card-value">{totalClicks || 1284}</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-card-accent-border"></div>
                        <div className="stat-icon-box yellow">
                            <span className="coin-emoji">🪙</span>
                        </div>
                        <div>
                            <div className="stat-card-label">Credits Remaining</div>
                            <div className="stat-card-value">{userDetails?.credits ?? 10}</div>
                        </div>
                    </div>
                </div>

                {/* Data Table Container Card */}
                <div className="dashboard-table-card">
                    {/* Top Controls Bar: Search on left, Add Link button on right */}
                    <div className="dash-table-top-bar">
                        <div className="dash-search-input-wrapper">
                            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <input
                                type="text"
                                className='search-input-field'
                                placeholder='Search'
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(0);
                                }}
                            />
                        </div>

                        {permission.canCreateLink && (
                            <button className="btn add-link-purple-btn" onClick={() => handleOpenModal(false)}>
                                Add Link
                            </button>
                        )}
                    </div>

                    {errors.message && (
                        <div className="alert alert-danger mx-3 my-2" role="alert">
                            {errors.message}
                        </div>
                    )}

                    <div style={{ height: 440, width: '100%' }}>
                        <DataGrid
                            getRowId={(row) => row._id}
                            rows={linksData}
                            columns={columns}
                            loading={loading}
                            initialState={{
                                pagination: {
                                    paginationModel: { pageSize: pageSize, page: currentPage }
                                }
                            }}
                            pageSizeOptions={[2, 3, 5, 10]}
                            paginationMode='server'
                            onPaginationModelChange={(newPage) => {
                                setCurrentPage(newPage.page);
                                setPageSize(newPage.pageSize);
                            }}
                            rowCount={totalRecords}
                            sortingMode='server'
                            sortModel={sortModel}
                            onSortModelChange={(newModel) => {
                                setSortModel(newModel);
                                setCurrentPage(0);
                            }}
                            disableRowSelectionOnClick
                            sx={{ fontFamily: 'inherit', border: 'none' }}
                            rowHeight={64}
                        />
                    </div>
                </div>


                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{isEdit ? 'Update Link' : 'Add Link'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="campaignTitle" className="form-label">Campaign Title</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.campaignTitle ? 'is-invalid' : ''}`}
                                    id="campaignTitle"
                                    name="campaignTitle"
                                    value={formData.campaignTitle}
                                    onChange={handleChange}
                                />
                                {errors.campaignTitle && (
                                    <div className="invalid-feedback">
                                        {errors.campaignTitle}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="originalUrl" className="form-label">URL</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.originalUrl ? 'is-invalid' : ''}`}
                                    id="originalUrl"
                                    name="originalUrl"
                                    value={formData.originalUrl}
                                    onChange={handleChange}
                                />
                                {errors.originalUrl && (
                                    <div className="invalid-feedback">
                                        {errors.originalUrl}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">Category</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                />
                                {errors.category && (
                                    <div className="invalid-feedback">
                                        {errors.category}
                                    </div>
                                )}
                            </div>

                            <div className='mb-2'>
                                <label htmlFor='thumbnail'>Thumbnail</label>
                                <input
                                    type='file'
                                    accept='image/*'
                                    className='form-control'
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setThumbnailFile(file);
                                            setPreviewUrl(URL.createObjectURL(file));
                                        }
                                    }}
                                />
                                {previewUrl && (
                                    <img src={previewUrl} alt='preview'
                                        className='img-responsive border rounded-2 mt-2'
                                        style={{ maxHeight: '100px' }}
                                    />
                                )}
                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>

                <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete the link?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='btn btn-secondary' onClick={handleCloseDeleteModal}>
                            Cancel
                        </button>
                        <button className='btn btn-danger' onClick={handleDelete}>
                            Delete
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default LinksDashboard;
