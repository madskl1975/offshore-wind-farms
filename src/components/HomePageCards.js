import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
//  Hook: useNavigate returns a function that lets you navigate programmatically
//  https://reactrouter.com/en/main/hooks/use-navigate

export default function Site({ site }) {
  const navigate = useNavigate();
  //  site is a prop containing site data:
  //  {id: "...", name: "..." image: "...", developmentStatus: "...", installedCapacity: "..."}

  function handleClick() {
    navigate(`site/${site.id}`);
  }

  //  `...` = Template literals are literals delimited with backtick (`) characters, allowing for multi-line strings,
  //  string interpolation with embedded expressions, and special constructs called tagged templates. 
  //  A long with having normal strings, template literals can also contain other parts called placeholders, which are 
  //  embedded expressions delimited by a dollar sign and curly braces: ${expression}.
  //  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

  return (
    <Col xl={3} lg={4} md={6} sm={12}>
      {/* Bootstrap @media breakpoints xs = default <576 px (portrait phones), sm = ≥576px (landscape phones), 
      md = ≥768px (tablets), lg = ≥992px (desktops), xl = ≥1200px (large desktops and up)
      Custom breakpoints er ikke tilføjet, men kan tilføjes med ThemeProvider  */}
      <Card
        style={{ width: "18rem" }}
        className="cards mb-4"
        onClick={handleClick}
      >
        <Card.Img variant="top" src={site.image} alt={site.name} />
        <Card.Body>
          <Card.Title>
            <h4>{site.name}</h4>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {site.country} | {site.developmentStatus}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2">
            Installed Capacity: {site.installedCapacity} MW
          </Card.Subtitle>
          {site.turbine?.map((turbine, index) => (
            <div key={index}>
              <Card.Subtitle className="mb-2">
                Turbine: {turbine.model}
              </Card.Subtitle>
              <Card.Subtitle className="mb-2">
                Number of Turbines: {turbine.numberOfTurbines}
              </Card.Subtitle>
            </div>
          ))}
          {/* The optional chaining (?.) operator accesses an object's property or
          calls a function. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining */}
          {/* The index of the current element being processed in the array. 
          https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map  */}
        </Card.Body>
      </Card>
    </Col>
  );
}
