import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { NosotrosCard } from "./NosotrosCard";
import Alumno from "../assets/img/alumno.jpg";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Nosotros = () => {

  const integrantes = [
    {
      title: "Sebastian Manrique",
      description: "Estudiante de la carrera de Ing. de las telecomunicaciones",
      imgUrl: Alumno,
    },
    {
      title: "Alexandra Zavala",
      description: "Estudiante de la carrera de Ing. Informática",
      imgUrl: Alumno,
    },
    {
        title: "Diego Veramendi",
        description: "Estudiante de la carrera de Ing. Informática",
        imgUrl: Alumno,
      },
    {
        title: "Alumno 3",
        description: "Descripcion",
        imgUrl: Alumno,
    }
  ];

  return (
    <section className="project" id="nosotros">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Nosotros</h2>
                <p>Un grupo de estudiantes la Pontificia Universidad Católica del Perú</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {
                          integrantes.map((integrante, index) => {
                            return (
                              <NosotrosCard
                                key={index}
                                {...integrante}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="section">
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.</p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.</p>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}