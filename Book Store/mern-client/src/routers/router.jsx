import{
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from "../App";
import Home from "../Home/Home";
import Shop from "../Shop/Shop";
import About from "../components/About";
import Blog from "../components/Blog";
import SingleBook from "../Shop/SingleBook";
import DashboardLayout from "../dashboard/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import UploadBooks from "../dashboard/UploadBooks";
import ManageBooks from "../dashboard/ManageBooks";
import EditBooks from "../dashboard/EditBooks";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children:[
            {
                path: '/',
                element: <Home/>
            },
            {
                path: "/Shop",
                element: <Shop/> 
            },
            {
                path: "/about",
                element: <About/>
            },
            {
                path: "/blog",
                element: <Blog/>
            }, {
                path: "/book/:id", 
                element: <SingleBook/>,
                loader: ({params}) => fetch(`http://localhost:5000/book/${params.id}`)
            }

        ]
    },
    {
        path: "/admin/dashboard",
        element: <DashboardLayout/>,
        children: [
            {
                path: "/admin/dashboard",
                element: <Dashboard/>
            },
            {
                path: "/admin/dashboard/upload",
                element: <UploadBooks/>
            },
            {
                path: "/admin/dashboard/manage",
                element: <ManageBooks/>
            },
            {
                path: "/admin/dashboard/edit-books/:id",
                element: <EditBooks/>,
                loader:({params}) => fetch(`http://localhost:5000/book/${params.id}`)
            }
        ]
    }
]);

export default router;
