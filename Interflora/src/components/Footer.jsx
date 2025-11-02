import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#f6f6f6]">
      <section>
        <p className="text-center pt-4">Follow us on:</p>
        <div className="border-b flex justify-center items-center  p-6">
          <i className="fa-brands fa-facebook fa-2x"></i>
          <i className="fa-brands fa-instagram fa-2x"></i>
          <i className="fa-brands fa-linkedin fa-2x"></i>
        </div>
      </section>
      <section className="flex border-b list-none gap-4 justify-center items-center p-8">
        <li>ABOUT US</li>
        <li>WEDDINGS</li>
        <li>MEDIA COVERAGE</li>
        <li>TERMS</li>
        <li>PRIVACY POLICY</li>
        <li>FAQ</li>
        <li>CONTACT US</li>
        <li>BLOG</li>
      </section>
   
      <section className="bg-black text-white flex justify-between pl-24 px-16 items-center">
        <img
          src="https://cdnnew.interflora.in/interflora/assets/images/if-footer-logo-new.png"
          alt="logo_footer"
          className="h-20"
        />
        <div className="flex flex-col">
          <p>Call Us - +91-(22) 3965-0333, +91-(22) 4343-3300</p>

          <p>100% Secure Shopping | Payment Methods:</p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
