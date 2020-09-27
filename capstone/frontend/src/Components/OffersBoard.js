import React from 'react';
import OfferRow from './OfferRow';

class OffersBoard extends React.Component {

    render() {
        return (
            <div>
                {this.props.offers.map(offer => (
                    <OfferRow key={offer.id} offer={offer} />
                ))}
            </div>
        );
    }
}

export default OffersBoard;