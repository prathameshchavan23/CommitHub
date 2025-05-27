import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-black text-base-content py-4 w-full border-t border-gray-300 mt-190
    ">
      <aside>
        <p className="text-sm opacity-75 hover:opacity-100">
          Copyright © {new Date().getFullYear()} -{" "}
          <span className="font-semibold">DevTinder</span>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
