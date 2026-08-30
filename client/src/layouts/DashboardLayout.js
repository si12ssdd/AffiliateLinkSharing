import DashboardFooter from "./DashboardFooter";
import DashboardHeader from "./DashboardHeader";

function DashboardLayout({ children }) {
    return (
        <>
            <DashboardHeader />
            {children}
            <DashboardFooter />
        </>
    );
}

export default DashboardLayout;