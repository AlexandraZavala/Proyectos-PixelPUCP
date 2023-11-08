import { Col } from "react-bootstrap";

export const NosotrosCard = ({ title, description, imgUrl }) => {
  return (
    <Col size={12} sm={6} md={3}>
      <div className="proj-imgbx">
        <img src={imgUrl} width={10} height={10}/>
        <div className="proj-txtx">
          <h4>{title}</h4>
          <span>{description}</span>
        </div>
      </div>
    </Col>
  )
}