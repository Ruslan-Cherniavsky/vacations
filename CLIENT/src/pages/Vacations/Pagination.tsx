import React from "react";

function MyPagination({ cardsPerPage, totalCards, paginate }: { cardsPerPage: any, totalCards: any, paginate: any }) {
    const cardNumbers = []

    for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
        cardNumbers.push(i)
    }

    return (
        <>
            <div >
                <ul className="pagination">
                    <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>

                    {cardNumbers.map(number => (
                        <li className="waves-effect" key={number}>
                            <a onClick={() => paginate(number)} href="#!">{number}</a></li>
                    ))}
                    <li className="waves-effect"><a href="#!"> <i className="material-icons">chevron_right</i></a></li>
                </ul>
            </div>
        </>
    );
}

export { MyPagination };

