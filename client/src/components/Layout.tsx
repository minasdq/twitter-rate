import Header from './Header';

interface HeaderProps {
  children: JSX.Element
}

const Layout = ({ children }: HeaderProps) => (
  <>
    <Header />
    {children}
  </>
);

export default Layout;
