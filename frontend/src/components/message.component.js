import React from "react";

const Message = (props) => {
    return (
        <p className="text-xs text-gray-500 mt-3" role="alert">
            {props.message.msgBody}
        </p>
    );
};

export default Message;
