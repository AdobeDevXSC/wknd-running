import Link from "next/link"

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-heading">About Wknd.Running</h3>
          <ul className="footer-links">
            <li>
              <Link href="#">News</Link>
            </li>
            <li>
              <Link href="#">Careers</Link>
            </li>
            <li>
              <Link href="#">Investors</Link>
            </li>
            <li>
              <Link href="#">Purpose</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-heading">Help</h3>
          <ul className="footer-links">
            <li>
              <Link href="#">Order Status</Link>
            </li>
            <li>
              <Link href="#">Shipping & Delivery</Link>
            </li>
            <li>
              <Link href="#">Returns</Link>
            </li>
            <li>
              <Link href="#">Payment Options</Link>
            </li>
            <li>
              <Link href="#">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-heading">Join Us</h3>
          <ul className="footer-links">
            <li>
              <Link href="#">Wknd.Running App</Link>
            </li>
            <li>
              <Link href="#">Become a Member</Link>
            </li>
            <li>
              <Link href="#">Student Discount</Link>
            </li>
            <li>
              <Link href="#">Refer a Friend</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copyright">© {new Date().getFullYear()} Wknd.Running, Inc. All Rights Reserved.</p>
        <div className="footer-legal-links">
          <Link href="#">Guides</Link>
          <Link href="#">Terms of Sale</Link>
          <Link href="#">Terms of Use</Link>
          <Link href="#">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}
