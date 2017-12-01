import React from 'react';

//export default ({ name }) => <h1>Hello {name}!</h1>;

const BlockStyle = {
  width: "90%",
  textAlign: "left",
  background: "#fff",
  borderRadius: "5px",
  borderColor: "#FaFaFa",
  boxShadow: "1px 1px 1px rgba(0,0,0,.3)",
  cursor: "pointer",
  paddingBottom: "10px",
  marginBottom: "10px"
};

const ItemTitleStyle = 
{
  padding: "5px 10px",
  borderBottom: "1px solid #dbdbdb",
  whiteSpace: "normal",
  wordBreak: "break-all",
  wordWrap: "break-world",
  fontFamily: "sans-serif",
  //fontSize: "8px",
}

const ItemSnippetStyle =
  {
    padding: "5px 10px",
    whiteSpace: "normal",
    wordBreak: "break-all",
    wordWrap: "break-world",
    //fontSize: "8px",
		//fontWeight: "bolder"
  }

class Block extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      title: props.title,
      snippet: props.snippet
      };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <div style={BlockStyle}>
        <div style={ItemTitleStyle}>
          {this.state.title}
        </div>
        <div style={ItemSnippetStyle}>
          {this.state.snippet}
        </div>
      </div>
    );
  }
}

export default Block;