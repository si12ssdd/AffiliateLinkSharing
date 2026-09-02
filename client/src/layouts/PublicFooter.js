function PublicFooter() {
    return (
        <footer className="public-footer text-center">
            <div className="container">
                <span className="footer-brand">Affiliate++</span>
                <p>&copy; {new Date().getFullYear()} Affiliate++. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default PublicFooter;