import Link from "next/link";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
   <Link
     href={href}
     className="text-text hover:text-primary transition-colors"
   >
     {children}
   </Link>
 );

 export default NavLink;