import React from 'react';
import PropTypes from 'prop-types';
import { connect, withFragments } from 'plugin-api/beta/client/hocs';
import { bindActionCreators } from 'redux';
// import AuthorName from '../components/AuthorName';
import {
  setContentSlot,
  resetContentSlot,
} from '../actions';
import { compose, gql } from 'react-apollo';
import {
  getSlotFragmentSpreads,
  getShallowChanges,
} from 'plugin-api/beta/client/utils';

class AuthorNameContainer extends React.Component {
  shouldComponentUpdate(nextProps) {
    // Specifically handle `showMenuForComment` if it is the only change.
    const changes = getShallowChanges(this.props, nextProps);
    if (changes.length === 1 && changes[0] === 'showMenuForComment') {
      const commentId = this.props.comment.id;
    }

    // Prevent Slot from rerendering when no props has shallowly changed.
    return changes.length !== 0;
  }

  render() {
    const {
      root,
      asset,
      comment,
      contentSlot,
    } = this.props;

    const slotPassthrough = { root, asset, comment };

    return (
      <a 
        href=""
        slotPassthrough={slotPassthrough}
        contentSlot={contentSlot}
      >
        Valentina Tereshkova
      </a>
    );
  }
}

AuthorNameContainer.propTypes = {
  root: PropTypes.object.isRequired,
  asset: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  contentSlot: PropTypes.string
};

const slots = [
  'authorMenuInfos', 
  'authorMenuActions'
];

const mapStateToProps = ({ talkPluginAuthorMenu: state }) => ({
  contentSlot: state.contentSlot,
  showMenuForComment: false,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setContentSlot,
      resetContentSlot,
    },
    dispatch
  );

const withAuthorNameFragments = withFragments({
  root: gql`
    fragment TalkAuthorMenu_AuthorName_root on RootQuery {
      __typename
      ${getSlotFragmentSpreads(slots, 'root')}
    }`,
  asset: gql`
    fragment TalkAuthorMenu_AuthorName_asset on Asset {
      __typename
      ${getSlotFragmentSpreads(slots, 'asset')}
    }`,
  comment: gql`
    fragment TalkAuthorMenu_AuthorName_comment on Comment {
      __typename
      id
      user {
        username
      }
      ${getSlotFragmentSpreads(slots, 'comment')}
    }`,
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withAuthorNameFragments
);

export default enhance(AuthorNameContainer);
