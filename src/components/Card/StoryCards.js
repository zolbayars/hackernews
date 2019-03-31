import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Card, {
  CardPrimaryContent,
  CardMedia,
  CardActions,
  CardActionButtons,
  CardActionIcons
} from "@material/react-card";
import { Headline6, Subtitle2, Body2, Caption } from "@material/react-typography";
import  Button  from "@material/react-button";
import  MaterialIcon from "@material/react-material-icon";
import IconButton from "@material/react-icon-button";

import './index.css';

const StoryCards = ({ result }) => 

  <div className="table">
    
      {result.map((item) => 
      

        <Card className='mdc-card demo-card'>
          <CardPrimaryContent className='demo-card__primary-action'>
            <div className='demo-card__primary'>
              <Headline6 className='demo-card__title'>
              {item.title.substr(0, 20)}
              </Headline6>
              <Subtitle2 className='demo-card__subtitle'>
                by <Link to={"/user/"+item.by}>{item.by}</Link>
              </Subtitle2>
            </div>
            <Body2 className='demo-card__secondary'>
              {item.title}
            </Body2>
            <Caption className='demo-card__secondary'>
              Comments: {item.descendants} Score: {item.score}
            </Caption>
          </CardPrimaryContent>
          <CardActions>
            <CardActionButtons>
              <a href={item.url}><Button>Read</Button></a>
              <Link to={"/item/"+item.id}><Button>Comments</Button></Link>
            </CardActionButtons>
            <CardActionIcons>
              <IconButton>
                <MaterialIcon icon='favorite_border' />
              </IconButton>
              <IconButton>
                <MaterialIcon icon='share' />
              </IconButton>
              <IconButton>
                <MaterialIcon icon='more_vert' />
              </IconButton>
            </CardActionIcons>
          </CardActions>
        </Card>
      )}
  </div>

StoryCards.propTypes  = {
    result: PropTypes.array.isRequired,
}



export default StoryCards; 