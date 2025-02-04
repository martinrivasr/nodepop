import MenuItems from "./Navlinks";
import LanguageSelector from "./LanguageSelector";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark px-3 border-warning border-4">
      <div className="container-fluid d-flex align-items-center justify-content-between border-success border-4">
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center" href="/">
          <i className="bi bi-house fs-3 me-2"></i>
          Nodepop
        </a>

        {/* Menú principal */}
        <MenuItems />

        {/* Selector de idioma */}
        <LanguageSelector />

        {/* Menú de perfil */}
        <ProfileMenu />
      </div>
    </header>
  );
};

export default Navbar;
