import { Card } from './Card'

function CardList({ catalog = [], deleteHandle, followHandle, followHandleOff }:
    { catalog: any, deleteHandle: Function, followHandle: Function, followHandleOff: Function }) {
    return (
        <>
            <div className='list'>
                {
                    // @ts-ignore
                    catalog.map((e) => (<Card
                        key={e.id}
                        deleteHandle={deleteHandle}
                        {...e}
                        followHandle={followHandle}
                        followHandleOff={followHandleOff} />))
                }
            </div>
        </>
    );
}

export { CardList };
