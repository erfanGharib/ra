import { Link } from "react-router-dom";
import notFound from '../assets/images/placeholder.jpg'

const NoPage = () => {
    return (
        <section className="h-full w-full flex justify-center items-center">
            <div className='mt-12'>
                <img src={notFound} alt='notFound' width={250} className="rounded-lg" />
                <p className='text-gray-500 my-4'>Page You're Looking for Not Found!</p>
                <Link to='/' className="btn w-max mx-auto gold-btn">Main Page</Link>
            </div>
        </section>
    );
}
export default NoPage;