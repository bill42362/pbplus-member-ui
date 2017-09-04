// ImageInputBox.react.js
'use strict';
import PropTypes from 'prop-types';
import React from 'react';
import MouseTracker from './MouseTracker.react.js';
import '../css/image-input-box.less';

const moverSize = {width: 1280, height: 720};
const defaultAction = {
    type: '',
    stretchFunction: () => ({stretch: {x: 0, y: 0}, move: {x: 0, y: 0}}),
};

class ImageInputBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseCursor: 'move',
            action: defaultAction,
        };
        this.imageType = /^image\//;
        this.onFileChange = this.onFileChange.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onDrag = this.onDrag.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
    }
    checkMouseOnEdge({ x, y }, element) {
        const offset = 10;
        const { width, height } = element.getBoundingClientRect();
        return {
            isOnLeft: offset > Math.abs(x), isOnRight: offset > Math.abs(width - x),
            isOnTop: offset > Math.abs(y), isOnBottom: offset > Math.abs(height - y),
        };
    }
    cancelEventActions(e) { e.stopPropagation(); e.preventDefault(); }
    onFileChange(e) {
        var files = e.target.files;
        if(files[0] && files[0].type && this.imageType.test(files[0].type)) {
            let url = URL.createObjectURL(files[0]);
            this.props.updateImageSource(url);
        }
    }
    onDrop(e) {
        this.cancelEventActions(e);
        var files = e.dataTransfer.files;
        if(files[0] && files[0].type && this.imageType.test(files[0].type)) {
            let url = URL.createObjectURL(files[0]);
            this.props.updateImageSource(url);
        }
    }
    onMouseMove(mouseState) {
        if(this.state.action.type) { return; }
        const { x, y } = mouseState.axis;
        const { top, left } = this.props.editorState;
        const { isOnLeft, isOnRight, isOnTop, isOnBottom } = this.checkMouseOnEdge(
            {x: x - left - moverSize.width + 60, y: y - top - moverSize.height + 60},
            this.refs.fullImageView
        );
        // Change mouse cursor while not actioning.
        let mouseCursor = 'move';
        if(isOnLeft || isOnRight) { mouseCursor = 'ew-resize'; }
        if(isOnTop || isOnBottom) { mouseCursor = 'ns-resize'; }
        if((isOnLeft && isOnTop) || (isOnRight && isOnBottom)) { mouseCursor = 'nwse-resize'; }
        else if((isOnLeft && isOnBottom) || (isOnRight && isOnTop)) { mouseCursor = 'nesw-resize'; }
        if(mouseCursor != this.state.mouseCursor) { this.setState({ mouseCursor }); }
    }
    onMouseDown(mouseState) {
        const { x, y } = mouseState.axis;
        const { top, left } = this.props.editorState;
        const { isOnLeft, isOnRight, isOnTop, isOnBottom } = this.checkMouseOnEdge(
            {x: x - left - moverSize.width + 60, y: y - top - moverSize.height + 60},
            this.refs.fullImageView
        );
        // Setup action properties.
        if(!isOnLeft && !isOnRight && !isOnTop && !isOnBottom) {
            this.setState({action: Object.assign({}, defaultAction, {type: 'move'})});
        } else {
            const action = Object.assign({}, defaultAction, {type: 'stretch'});
            const { image } = this.props.editorState;
            const imageAspect = image.width/image.height;
            if(isOnRight) {
                action.stretchFunction = (move) => ({
                    stretch: {x: move.x, y: 0}, move: {x: 0, y: 0},
                });
            }
            if(isOnLeft) {
                action.stretchFunction = (move) => ({
                    stretch: {x: -move.x, y: 0}, move: {x: move.x, y: 0},
                });
            }
            if(isOnBottom) {
                action.stretchFunction = (move) => ({
                    stretch: {x: 0, y: move.y}, move: {x: 0, y: 0},
                });
            }
            if(isOnTop) {
                action.stretchFunction = (move) => ({
                    stretch: {x: 0, y: -move.y}, move: {x: 0, y: move.y},
                });
            }
            if(isOnBottom && isOnRight) {
                action.stretchFunction = (move) => ({
                    stretch: {x: move.x, y: move.x/imageAspect},
                    move: {x: 0, y: 0},
                });
            }
            if(isOnBottom && isOnLeft) {
                action.stretchFunction = (move) => ({
                    stretch: {x: -move.x, y: -move.x/imageAspect},
                    move: {x: move.x, y: 0},
                });
            }
            if(isOnTop && isOnRight) {
                action.stretchFunction = (move) => ({
                    stretch: {x: move.x, y: move.x/imageAspect},
                    move: {x: 0, y: -move.x/imageAspect},
                });
            }
            if(isOnTop && isOnLeft) {
                action.stretchFunction = (move) => ({
                    stretch: {x: -move.x, y: -move.x/imageAspect},
                    move: {x: move.x, y: move.x/imageAspect},
                });
            }
            this.setState({ action });
        }
    }
    onMouseUp(mouseState) { this.setState({action: Object.assign({}, defaultAction)}); }
    onDrag(mouseState) {
        const { action } = this.state;
        if('move' === action.type) {
            const { movePicture } = this.props;
            movePicture(mouseState.move);
        } else if('stretch' === action.type) {
            const { movePicture, stretchPicture } = this.props;
            const { stretch, move } = action.stretchFunction(mouseState.move);
            stretchPicture(stretch);
            movePicture(move);
        }
    }
    render() {
        const { isEditing, mouseCursor } = this.state;
        const { editorState } = this.props;
        const { top, left, width, height, image } = editorState;
        return <div
            className='image-input-box'
            title='拖曳圖片至此或點這裡編輯圖片'
            data-enable_select_file={true}
            onClick={() => { this.setState({isEditing: !isEditing}); }}
            onDragEnter={this.cancelEventActions}
            onDragOver={this.cancelEventActions}
            onDrop={this.onDrop}
        >
            {isEditing && <img
                className='full-image-view' ref='fullImageView'
                src={image.src} style={{ top, left, width, height }}
            />}
            <img
                className='preview'
                src={editorState.resultSource}
                data-enable_select_file={true}
            />
            {isEditing && <div
                className='mouse-tracker-wrapper'
                style={{
                    width: 2*moverSize.width,
                    height: 2*moverSize.height,
                    cursor: mouseCursor,
                    top: -moverSize.height + 60,
                    left: -moverSize.width + 60
                }}
            >
                <MouseTracker
                    onMouseDrag={this.onDrag}
                    onMouseMove={this.onMouseMove}
                    onMouseUp={this.onMouseUp}
                    onMouseDown={this.onMouseDown}
                />
            </div>}
        </div>;
    }
}

ImageInputBox.propTypes = {
    editorState: PropTypes.shape({
        top: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        resultSource: PropTypes.string.isRequired,
        image: PropTypes.object.isRequired,
    }),
    updateImageSource: PropTypes.func.isRequired,
    stretchPicture: PropTypes.func.isRequired,
    movePicture: PropTypes.func.isRequired,
};

export default ImageInputBox;
