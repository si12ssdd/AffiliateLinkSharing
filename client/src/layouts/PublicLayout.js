import PublicFooter from "./PublicFooter";
import PublicHeader from "./PublicHeader";

function PublicLayout({ children }) {
    return (
        <>
            <PublicHeader />
            {children}
            <PublicFooter />
        </>
    );
}

export default PublicLayout;