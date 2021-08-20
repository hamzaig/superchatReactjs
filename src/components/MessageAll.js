import React from 'react'
import { formatRelative } from "date-fns";
const MessageAll = ({
    createdAt = null,
    text = "",
    displayName = "",
    photoURL = "",
}) => {
    return (
        <div>
            {photoURL ? (<img src={photoURL} alt="Avatar" width="45" height="45" />) : null}
            {displayName ? (<p className="username">{displayName}</p>) : null}
            <p>{text}</p>
            {createdAt?.seconds ? (
                <span className="text-muted">
                    {formatRelative(new Date(createdAt.seconds * 1000), new Date())}
                </span>
            ) : null}
        </div>
    );
};

export default MessageAll;
