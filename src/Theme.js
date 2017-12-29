import React from "react";
import Block from "./Block";
import "./block_style.css";
import { connect } from "react-redux";
import { setBlockViewVisible, setBlockViewOpenedId } from "./actions/deskActions";

//export default ({ name }) => <h1>Hello {name}!</h1>;
/*
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(window.innerHeight);
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? "O" : "     I     "}
      </button>
    );
  }
}
*/

class Theme extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      blocks: props.blocks,
      id: props.id
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("Theme.handleClick");
    const { dispatch } = this.props
    dispatch(setBlockViewOpenedId(this.state.id))
    dispatch(setBlockViewVisible(true))
  }

  render() {
    const blocksTemp = [];

    if (this.state.blocks) {
      for (var i = 0; i < this.state.blocks.length; i++) {
        blocksTemp.push(
          <Block key={i}
            title={this.state.blocks[i].title}
            snippet={this.state.blocks[i].data}
          />
        );
      }
    }
    return (
      <div style={ThemeStyle}>
        <div className="themeRow">
          <div className="themeTitleStyle">{this.state.title}</div>
        </div>
        <div onClick={this.handleClick} className="themeRow">{blocksTemp}</div>
        <a
          style={{
            marginLeft: "15px",
            textAlign: "left",
            cursor: "pointer"
          }}
        >
          Добавить карточку...
        </a>
      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {}
}

export default connect(
  mapStateToProps//,
  //mapDispatchToProps
)(Theme);

const BlockListStyle = {
  overflowY: "scroll",
  height: "300px"
};

const ThemeStyle = {
  width: "300px",
  display: "inline-block",
  height: "100%",
  overflow: "hidden",
  minheight: "100px",
  backgroundColor: "#e2e4e6",
  boxShadow: "1px 1px 1px rgba(0, 0, 0, .5)",
  borderRadius: "3px",
  paddingBottom: "10px",
  marginRight: "10px",
  marginLeft: "10px",
  verticalAlign: "top"
};

const ThemeTitleStyle = {};