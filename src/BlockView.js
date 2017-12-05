import React from "react";

class BlockView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      text: props.text,
      isVisible: true,
      test: props.text
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  setVisible() {
    console.log("BlockView.setVisible");
    this.setState(prevState => ({
      isVisible: !prevState.isVisible
    }));
  }

  handleClick() {
    console.log("BlockView.handleClick");
    this.setState(prevState => ({
      isVisible: !prevState.isVisible
    }));
  }

  render() {
    console.log("BlockView.render");
    return (
      <div>
        {this.state.isVisible && (
          <div style={BlockViewStyle}>
            <button onClick={this.handleClick}>x</button>
            <div style={{ fontSize: "16px", fontWeight: "bolder" }}>
              {this.state.title}
            </div>

            <div
              style={TextStyle}
              dangerouslySetInnerHTML={{ __html: this.state.text }}
            />
          </div>
        )}
      </div>
    );
  }
}

const TextStyle = {
  overflowY: "scroll",
  height: "300px"
};

const BlockViewStyle = {
  background: "#efefef",
  borderRadius: "5px",
  borderColor: "#fff",
  boxShadow: "2px 2px 2px rgba(0,0,0,.3)",
  cursor: "pointer",
  paddingBottom: "0px",
  zIndex: "99",
  position: "absolute",
  top: "100px",
  left: "200px",

  width: "600px",
  padding: "10px",
  paddingLeft: "40px",
  paddingTop: "20px",
  lineHeight: "20px"
};

const BlockInnetViewStyle = {};

var publicVariable = new BlockView({
  title: "",
  text: "",
  isVisible: false
});

export default BlockView;

export function GetBlockView() {
  return publicVariable;
}
