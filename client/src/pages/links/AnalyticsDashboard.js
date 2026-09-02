import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serverEndpoint } from "../../config/config";
import { DataGrid } from '@mui/x-data-grid';
import { Bar, Pie } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './LinksDashboard.css';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend,
    Title
} from 'chart.js';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend,
    Title
);

const formatDate = (isoDateString) => {
    if (!isoDateString) return '';

    try {
        const date = new Date(isoDateString);

        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    } catch (error) {
        console.log(error);
        return '';
    }
};

function AnalyticsDashboard() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [analyticsData, setAnalyticsData] = useState([]);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    const fetchAnalytics = useCallback(async () => {
        try {
            const response = await axios.get(`${serverEndpoint}/links/analytics`, {
                params: {
                    linkId: id,
                    from: fromDate,
                    to: toDate
                },
                withCredentials: true
            });
            setAnalyticsData(response.data);
        } catch (error) {
            console.log(error);
            navigate('/error');
        }
    }, [id, fromDate, toDate, navigate]);

    const groupBy = (key) => {
        return analyticsData.reduce((acc, item) => {
            const label = item[key] || 'unknown';
            acc[label] = (acc[label] || 0) + 1;
            return acc;
        }, {});
    };

    const clicksByCity = groupBy('city');
    const clicksByBrowser = groupBy('browser');

    const columns = [
        { field: 'ip', headerName: 'IP Address', flex: 1 },
        { field: 'city', headerName: 'City', flex: 1 },
        { field: 'country', headerName: 'Country', flex: 1 },
        { field: 'region', headerName: 'Region', flex: 1 },
        { field: 'isp', headerName: 'ISP', flex: 1 },
        { field: 'deviceType', headerName: 'Device', flex: 1 },
        { field: 'browser', headerName: 'Browser', flex: 1 },
        {
            field: 'clickedAt', headerName: 'Clicked At', flex: 1, renderCell: (params) => (
                <>{formatDate(params.row.clickedAt)}</>
            )
        },
    ];

    useEffect(() => {
        fetchAnalytics();
    }, [fetchAnalytics]);

    return (
        <div className="analytics-container">
            <div className="container py-4">
                <h1 className="analytics-title">📊 Link Analytics</h1>

                <div className="analytics-card">
                    <div className="analytics-card-title">🗓️ Date Filters</div>
                    <div className="filter-row">
                        <label>From:</label>
                        <DatePicker
                            selected={fromDate}
                            onChange={(date) => setFromDate(date)}
                            className="form-control"
                            placeholderText="Start date"
                        />
                        <label>To:</label>
                        <DatePicker
                            selected={toDate}
                            onChange={(date) => setToDate(date)}
                            className="form-control"
                            placeholderText="End date"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-8">
                        <div className="analytics-card">
                            <div className="analytics-card-title">📍 Clicks by City</div>
                            <Bar
                                data={{
                                    labels: Object.keys(clicksByCity),
                                    datasets: [
                                        {
                                            label: 'Clicks',
                                            data: Object.values(clicksByCity),
                                            backgroundColor: 'rgba(102, 126, 234, 0.6)',
                                            borderColor: '#667eea',
                                            borderWidth: 1,
                                            borderRadius: 6,
                                        }
                                    ]
                                }}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: { display: false }
                                    },
                                    scales: {
                                        y: { grid: { color: '#F1F5F9' } },
                                        x: { grid: { display: false } }
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="analytics-card">
                            <div className="analytics-card-title">🌐 Clicks by Browser</div>
                            <Pie
                                data={{
                                    labels: Object.keys(clicksByBrowser),
                                    datasets: [
                                        {
                                            data: Object.values(clicksByBrowser),
                                            backgroundColor: [
                                                '#667eea',
                                                '#764ba2',
                                                '#10B981',
                                                '#F59E0B',
                                                '#EF4444',
                                                '#6366F1',
                                            ],
                                            borderWidth: 0,
                                        }
                                    ]
                                }}
                                options={{ responsive: true }}
                            />
                        </div>
                    </div>
                </div>

                <div className="analytics-card">
                    <div className="analytics-card-title">📋 Click Details</div>
                    <DataGrid
                        getRowId={(row) => row._id}
                        rows={analyticsData}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 20, page: 0 }
                            }
                        }}
                        pageSizeOptions={[20, 50, 100]}
                        disableRowSelectionOnClick
                        showToolbar
                        sx={{
                            fontFamily: 'inherit',
                            border: 'none',
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#F8FAFC',
                            },
                            '& .MuiDataGrid-row:hover': {
                                backgroundColor: '#F8FAFC',
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default AnalyticsDashboard;