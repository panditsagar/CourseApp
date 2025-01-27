import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100  dark:bg-gray-900 text-gray-900 dark:text-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Company Info */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">TechLearn</h2>
            <p className="text-sm opacity-90 dark:opacity-75">
              Your one-stop destination for web development solutions.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-4 text-sm text-center md:text-left md:grid-cols-4">
            <div>
              <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Company
              </h2>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="hover:text-blue-500">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#careers" className="hover:text-blue-500">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-blue-500">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Resources
              </h2>
              <ul className="space-y-2">
                <li>
                  <a href="#blogs" className="hover:text-blue-500">
                    Blogs
                  </a>
                </li>
                <li>
                  <a href="#help" className="hover:text-blue-500">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-blue-500">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Social
              </h2>
              <ul className="space-y-2">
                <li>
                  <a href="#facebook" className="hover:text-blue-500">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#twitter" className="hover:text-blue-500">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#linkedin" className="hover:text-blue-500">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Stay Updated</h3>
            <p className="text-sm opacity-90 dark:opacity-75">
              Subscribe to our newsletter to get the latest updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-200"
              />
              <Button variant="default">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Separator */}
        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {new Date().getFullYear()} YourProject. All rights reserved.</p>
          <div className="flex gap-4">
            <a
              href="#facebook"
              className="hover:text-blue-500 dark:hover:text-blue-400"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#twitter"
              className="hover:text-blue-500 dark:hover:text-blue-400"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#instagram"
              className="hover:text-blue-500 dark:hover:text-blue-400"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/sagar-kumar-ab452b276/"
              className="hover:text-blue-500 dark:hover:text-blue-400"
              aria-label="LinkedIn"
              target="_blank"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
