import React from 'react';
import SearchBar from '../components/SearchBar';
import Content from '../components/Content';
import Footer from '../components/Footer';
import { connect } from 'react-redux';
import ImmutableRenderMixin from 'react-immutable-render-mixin';
import * as ItemsActions from '../actions';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
 
let App = React.createClass({
    mixins: [ImmutableRenderMixin],
    propTypes: {
        items: React.PropTypes.object,
        filter: React.PropTypes.string
    },
    render() {
        let styles = {
            width: '200px',
            margin: '30px auto 0'
        };
        //console.log('context:', this.context);
        const actions = this.props.actions;
        return (
            <div style={styles}>
                <h2>Manage Items</h2>
                <SearchBar filterItem={actions.filterItem}/>
                <Content items={this.props.items} filter={this.props.filter} deleteItem={actions.deleteItem}/>
                <Footer addItem={actions.addItem} deleteAll={actions.deleteAll}/>
                <Link to='/second'>下一页</Link>
            </div>
        );
    }
});

export default connect(state => ({
    items: state.items,
    filter: state.filter
}), dispatch => ({
    actions: bindActionCreators(ItemsActions, dispatch)
}))(App);