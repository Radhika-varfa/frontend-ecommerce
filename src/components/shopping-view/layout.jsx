import { Outlet } from "react-router"; 
import ShoppingHeader from "./header";

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
        {/*admin header */}
<ShoppingHeader/>
        <main className="flex flex-col w-full">
            <Outlet/>
        </main> 
    </div>
  )
}

export default ShoppingLayout;