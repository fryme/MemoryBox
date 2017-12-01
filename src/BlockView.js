import React from "react";

const BlockViewStyle = {
  width: "90%",
  textAlign: "left",
  background: "#fff",
  borderRadius: "5px",
  borderColor: "#FaFaFa",
  boxShadow: "1px 1px 1px rgba(0,0,0,.3)",
  cursor: "pointer",
  paddingBottom: "10px",
  marginBottom: "10px",
  zIndex: "99",
  position: "absolute",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  margin: "auto"
};

class BlockView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      text: props.text,
      isVisible: false
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
        {this.state.isVisible && <button onClick={this.handleClick} />}
        {this.state.isVisible && (
          <div style={BlockViewStyle}>{this.state.title}</div>
        )}
      </div>
    );
  }
}

var publicVariable = new BlockView({
  title: "",
  text: "",
  isVisible: false
});

export default BlockView;

export function GetBlockView() {
  return publicVariable;
}
