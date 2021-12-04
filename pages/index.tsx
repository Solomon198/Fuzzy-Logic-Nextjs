import type { NextPage } from "next";
import Image from "next/image";
import Layout from "../components/layout";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Layout>
      <section id="hero" className="hero d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 d-flex flex-column justify-content-center">
              <h1 data-aos="fade-up">
                Determine student performance by partial truth.
              </h1>
              <h2 data-aos="fade-up" data-aos-delay="400">
                Computer science ideas, turning educational uncertainties to
                reality.
              </h2>
              <Link href="/calculate" passHref={true}>
                <div
                  data-aos="fade-up"
                  data-aos-delay="600"
                  style={{ cursor: "pointer" }}
                >
                  <div className="text-center text-lg-start">
                    <a className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center">
                      <span>Get Started</span>
                      <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </Link>
            </div>
            <div
              className="col-lg-6 hero-img"
              data-aos="zoom-out"
              data-aos-delay="200"
            >
              <Image
                width={300}
                height={200}
                layout="responsive"
                src="/assets/img/hero-img.png"
                className="img-fluid"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </Layout>
  );
};

export default Home;
