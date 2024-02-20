const Footer = () => {
  return (
    <footer className=" text-white mt-12">
      <div className="container mx-auto px-4 py-12">
        <p className="text-center text-lg md:text-xl lg:text-2xl font-semibold">
          © {new Date().getFullYear()} All rights reserved to
          <span className="text-blue-500 ml-2">Dire Dawa University</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
