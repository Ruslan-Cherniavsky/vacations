import React from "react";

function Footer() {
    return (
        <>
            <footer className="page-footer teal lighten-4">
                <div className="footer-copyright">
                    <div className="container">
                        © {new Date().getFullYear()} By Ruslan Cherniavsky
                        <a className="grey-text text-lighten-4 right" href="#!">
                            Repo
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
}

export { Footer };
