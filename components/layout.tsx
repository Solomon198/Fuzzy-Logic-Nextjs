import Head from "next/head";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";

export default function Layout(props: any) {
  return (
    <div>
      <Head>
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta content="" name="description" />
        <meta content="" name="keywords" />
        <link href="/assets/img/favicon.png" rel="icon" />
        <link href="/assets/img/apple-touch-icon.png" rel="apple-touch-icon" />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
          rel="stylesheet"
        />

        <link href="assets/vendor/aos/aos.css" rel="stylesheet" />
        <link
          href="assets/vendor/bootstrap/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="assets/vendor/bootstrap-icons/bootstrap-icons.css"
          rel="stylesheet"
        />
        <link
          href="assets/vendor/glightbox/css/glightbox.min.css"
          rel="stylesheet"
        />
        <link href="assets/vendor/remixicon/remixicon.css" rel="stylesheet" />
        <link
          href="assets/vendor/swiper/swiper-bundle.min.css"
          rel="stylesheet"
        />
        <link href="assets/css/style.css" rel="stylesheet" />
      </Head>
      <body>
        <header id="header" className="header fixed-top">
          <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <Link passHref={true} href="/">
              <a className="logo d-flex align-items-center">
                <Image
                  width={"100%"}
                  height={"100%"}
                  src="/assets/img/logo.png"
                  alt=""
                />
                <span>FuzzyLogic</span>
              </a>
            </Link>

            {/* <nav id="navbar" className="navbar">
              <ul>
                <li>
                  <a className="nav-link scrollto active" href="#hero">
                    Home
                  </a>
                </li>
                <li>
                  <a className="nav-link scrollto" href="#about">
                    About
                  </a>
                </li>
                <li>
                  <a className="nav-link scrollto" href="#services">
                    Services
                  </a>
                </li>
                <li>
                  <a className="nav-link scrollto" href="#portfolio">
                    Portfolio
                  </a>
                </li>
                <li>
                  <a className="nav-link scrollto" href="#team">
                    Team
                  </a>
                </li>
                <li>
                  <a href="blog.html">Blog</a>
                </li>
                <li className="dropdown">
                  <a href="#">
                    <span>Drop Down</span>{" "}
                    <i className="bi bi-chevron-down"></i>
                  </a>
                  <ul>
                    <li>
                      <a href="#">Drop Down 1</a>
                    </li>
                    <li className="dropdown">
                      <a href="#">
                        <span>Deep Drop Down</span>{" "}
                        <i className="bi bi-chevron-right"></i>
                      </a>
                      <ul>
                        <li>
                          <a href="#">Deep Drop Down 1</a>
                        </li>
                        <li>
                          <a href="#">Deep Drop Down 2</a>
                        </li>
                        <li>
                          <a href="#">Deep Drop Down 3</a>
                        </li>
                        <li>
                          <a href="#">Deep Drop Down 4</a>
                        </li>
                        <li>
                          <a href="#">Deep Drop Down 5</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#">Drop Down 2</a>
                    </li>
                    <li>
                      <a href="#">Drop Down 3</a>
                    </li>
                    <li>
                      <a href="#">Drop Down 4</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="nav-link scrollto" href="#contact">
                    Contact
                  </a>
                </li>
                <li>
                  <a className="getstarted scrollto" href="#about">
                    Get Started
                  </a>
                </li>
              </ul>
              <i className="bi bi-list mobile-nav-toggle"></i>
            </nav> */}
          </div>
        </header>

        {props.children}
      </body>
      <Script src="/assets/vendor/purecounter/purecounter.js"></Script>
      <Script src="assets/vendor/aos/aos.js"></Script>
      <Script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></Script>
      <Script src="assets/vendor/glightbox/js/glightbox.min.js"></Script>
      <Script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></Script>
      <Script src="assets/vendor/swiper/swiper-bundle.min.js"></Script>
      <Script src="assets/vendor/php-email-form/validate.js"></Script>

      <Script src="assets/js/main.js"></Script>
    </div>
  );
}
