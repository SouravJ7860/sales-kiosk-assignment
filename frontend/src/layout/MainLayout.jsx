import Navbar from "../components/Common/Navbar";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />

      <main className="container">
        {children}
      </main>
    </>
  );
}

export default MainLayout;