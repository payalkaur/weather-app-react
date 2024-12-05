import { NavLink } from "react-router-dom"

function PageNotFound() {
    return (
        <div className="flex flex-col justify-center items-center align-middle p-6 gap-2">
            <h1 className="font-bold text-xl">Page Not Found</h1>
            <NavLink to="/" className={`text-sm hover:underline text-blue-500 ${(isActive: any) => { return isActive ? 'text-blue-600' : '' }}`} >Go to Home Page</NavLink>
        </div>
    )
}

export default PageNotFound