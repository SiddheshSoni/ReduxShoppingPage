import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = () => {

  const dummyData= [
    {id:"1", title:"phone", description:"works", price:100},
    {id:"2", title:"watch", description:"works", price:220},
    {id:"3", title:"laptop", description:"works", price:120},
    {id:"4", title:"shoe", description:"works", price:10},
  ];
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {dummyData.map(item=>{
          return (<ProductItem key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          description={item.description}
          />)
        })}
      </ul>
    </section>
  );
};

export default Products;
