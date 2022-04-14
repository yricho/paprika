import React from "react";
import PropTypes from "prop-types";

const Modal = (props) => {
    const { isShow, title, onClose, children } = props;

    if (isShow) {
        return (
            <div className="fixed flex items-center text-elephant justify-center top-0 bg-gray-500 inset-x-0 h-screen bg-opacity-75 z-20">
                <div className="bg-white p-4 rounded-md" style={{ width: 600 }}>
                    <div className="flex justify-between pb-4">
                        <span className="title text-lg font-medium">
                            {title}
                        </span>
                        {
                            onClose && (
                                <button
                                    onClick={onClose}
                                    className="hover:text-gray-500 text-2xl">
                                    &#10005;
                                </button>
                            )
                        }
                    </div>
                    <div className="content max-h-64 overflow-x-auto">
                        {children}
                    </div>
                </div>
            </div>
        )
    }
    return null;
}

Modal.propTypes = {
    isShow: PropTypes.bool,
    title: PropTypes.string,
    onClose: PropTypes.func,
    children: PropTypes.node
}

export default Modal;