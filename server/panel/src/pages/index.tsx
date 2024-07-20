import Header from "../components/header";
import Shell from "../components/shell";
import UserMedia from "../components/userMedia";
import UsersList from "../components/usersList";

const Home = () => {
    return (
        <main className="w-full flex items-start p-5 gap-y-5 flex-col h-full">
            <Header/>
            <div className="flex w-full h-full gap-4 [&>div]:border [&>div]:border-neutral-700 [&>div]:rounded-lg [&>div:nth-child(2)]:w-2/3 [&>div]:w-1/3 [&>div]:h-full ">
                <UsersList/>
                <Shell/>
                <UserMedia/>
            </div>
        </main>
    );
}
export default Home;