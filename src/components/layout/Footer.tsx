import Link from "next/link";
import { Home, Twitter, Linkedin, Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  platform: [
    { href: "/properties", label: "Browse All" },
    { href: "/properties?purpose=BUY", label: "Buy Property" },
    { href: "/properties?purpose=RENT", label: "Rent Property" },
    { href: "/list", label: "List for Free" },
    { href: "/contact", label: "Contact Us" },
  ],
  locations: [
    { href: "/properties?city=Dubai", label: "Dubai" },
    { href: "/properties?city=Abu+Dhabi", label: "Abu Dhabi" },
    { href: "/properties?city=Sharjah", label: "Sharjah" },
    { href: "/properties?city=Ajman", label: "Ajman" },
  ],
};

const socials = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Main Footer */}
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold">
                <Home className="h-5 w-5 text-dark-950" />
              </div>
              <span className="text-xl font-bold font-display">
                Home<span className="gradient-text">Hub</span>
              </span>
            </Link>
            <p className="text-gray-500 leading-relaxed mb-6 max-w-sm">
              The UAE&apos;s free property listing platform. List your home or find your next property — no agents, no commission, ever.
            </p>
            <div className="space-y-2.5 text-sm text-gray-500">
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-gold-500 shrink-0" />
                Dubai, United Arab Emirates
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-gold-500 shrink-0" />
                hello@homehub.ae
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-gold-500 shrink-0" />
                +971 4 000 0000
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-gray-200 hover:bg-gold-100 hover:text-gold-600 text-gray-500 flex items-center justify-center transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([key, links]) => (
            <div key={key}>
              <h4 className="text-gray-900 font-semibold mb-4 capitalize">{key}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-500 hover:text-gold-600 text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="container-custom px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} HomeHub. Free property listings in UAE. No commission, no agents.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-gray-700 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-700 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
