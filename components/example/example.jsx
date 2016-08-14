var React = require('react');

var Example = React.createClass({
    render: function () {
        var css = {
            color: this.props.color
        };
        return (
            <div style={css}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Example;
