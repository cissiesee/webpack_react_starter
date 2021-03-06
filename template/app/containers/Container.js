import React from "react";
import ReactCSSTransitionGroup from "react/lib/ReactCSSTransitionGroup";
import ImmutableRenderMixin from 'react-immutable-render-mixin';

let Container = React.createClass({
    mixins: [ImmutableRenderMixin],
    componentWillMount() {
        document.body.style.margin = "0px";
        // 这是防止页面被拖拽
        document.body.addEventListener('touchmove', (ev) => {
            ev.preventDefault();
        });
    },
    render() {
        //console.log(this.props.location.pathname, ',', this.props.location.action);
        let action = this.props.location.action;
        let transitionName = 'transitionWrapper' + (action === 'POP' ? '-back' : '');
        return (
            <div key={this.props.location.pathname}
                style={{position:"absolute", width: "100%", background: "#fff"}}>
                {
                    this.props.children
                }
            </div>
        );
    }
});

export default Container;