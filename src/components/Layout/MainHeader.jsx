import { useDispatch} from 'react-redux';
import CartButton from '../Cart/CartButton';
import classes from './MainHeader.module.css';

const MainHeader = () => {
  
  const dispatch = useDispatch();
  
  return (
    <header className={classes.header}>
      <h1>ReduxCart</h1>
      <nav>
        <ul>
          <li>
            <CartButton  />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
