import logo from '../assets/images/placeholder.jpg'

const Header = () => {
    return (
        <header className={`flex w-full f-center-between`}>
            <div className='flex f-center-between gap-2'>
                <img src={logo} alt="logo" className="w-7 rounded-md" />
                Remote Access Panel
            </div>
        </header>
    );
}

export default Header;