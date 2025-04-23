import React from 'react';
import {Coffee} from '../types/Coffee.ts'; // Adjust the path based on your file structure
import './CoffeeCard.css'; // Add custom CSS if needed for additional styling
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface CoffeeCardProps {
    coffee: Coffee;
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({coffee}) => {
    return (
        <div className="card">
            <img src={coffee.image} alt={coffee.title} className="card-image"/>
            <h3 className="card-title">{coffee.title}</h3>
            <p className="card-description">{coffee.description}</p>
            <p className="card-price">${coffee.price.toFixed(2)}</p> {/* Format price */}
            <p className="card-sales">Total Sales: {coffee.totalSales}</p>

            <p className="card-ingredients">
                Ingredients: {coffee.ingredients.length > 0 ? coffee.ingredients.join(', ') : "Secret"}
            </p>
            <button onClick={() => alert(`You ordered ${coffee.title}!`)}>
              <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: "0.5rem" }} /> Add to Cart
            </button>
        </div>
    );
};

export default CoffeeCard;