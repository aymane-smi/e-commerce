import React, {useState, useEffect} from 'react'
import {InputLabel, MenuItem, Grid, Typography, Select, Button} from '@material-ui/core';
import {useForm, FormProvider} from 'react-hook-form';
import InputForm from './costumTextField';
import {Link} from 'react-router-dom';
import {commerce} from '../../lib/commerce';

function AdressForm({token, next}) {
    const methods = useForm();
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const fetchToken = async(tokenId)=>{
        try{
            const {countries} = await commerce.services.localeListShippingCountries(tokenId);
            setShippingCountries(countries);
            setShippingCountry(Object.keys(countries)[0]);
        }catch(err){
            console.log(err.message);
        }
    };
    const fetchSubdivisions = async(tokenId, countryId)=>{
        try{
            const {subdivisions} = await commerce.services.localeListShippingSubdivisions(tokenId, countryId);
            setShippingSubdivisions(subdivisions);
            setShippingSubdivision(Object.keys(subdivisions)[0]);
        }catch(err){
            console.log(err.message);
        }
    };

    const fetchOptions = async(tokenId, country, region = null)=>{
        try{
            const options = await commerce.checkout.getShippingOptions(tokenId, {country, region});
            setShippingOptions(options);
            setShippingOption(options[0].id);
        }catch(err){
            console.log(err.message);
        }
    };

    useEffect(()=>{
        fetchToken(token.id);
    }, []);

    useEffect(()=>{
        if(shippingCountry)
            fetchSubdivisions(token.id, shippingCountry);
    }, [shippingCountry]);

    useEffect(()=>{
        if(shippingSubdivision){
            fetchOptions(token.id, shippingCountry, shippingSubdivision);
        }
    }, [shippingSubdivision]);

    const countries = Object.entries(shippingCountries).map(([code, name])=>({id: code, label: name}));
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name])=>({id:code, label: name}));
    const options = shippingOptions.map((option)=>({id: option.id, label: `${option.description} - (${option.price.formatted_with_symbol})`}));

  return (
    <>
    <Typography variant="h6" gutterBottom>
        Shipping Address
    </Typography>
    <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data)=>{console.log(data);next({...data, shippingCountry, shippingSubdivision, shippingOption})})}>
            <Grid container spacing={3}>
                <InputForm required name="firstname" label="First name"/>
                <InputForm required name="lastname" label="Last name"/>
                <InputForm required name="email" label="E-mail"/>
                <InputForm required name="address" label="Address"/>
                <InputForm required name="city" label="City"/>
                <InputForm required name="zip" label="Zip / Postal code"/>
                <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping Country</InputLabel>
                    <Select fullWidth value={shippingCountry} onChange={(evt)=>setShippingCountry(evt.target.value)}>
                        {countries.map(country =>
                        <MenuItem key={country.id} value={country.id}>
                            {country.label}
                        </MenuItem>)}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping subdivision</InputLabel>
                    <Select fullWidth value={shippingSubdivision} onChange={(evt)=>setShippingSubdivision(evt.target.value)}>
                        {subdivisions.map(subdivision=>
                        <MenuItem key={subdivision.id} value={subdivision.id}>
                        {subdivision.label}
                        </MenuItem>)}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping option</InputLabel>
                    <Select fullWidth value={shippingOption}onChange={(evt)=>setShippingOption(evt.target.value)}>
                        {options.map((option)=><MenuItem key={option.id} value={option.id}>
                            {option.label}
                        </MenuItem>)}
                    </Select>
            </Grid>
            </Grid>
            <br />
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button variant="outlined" component={Link} to="/cart">Back To Cart</Button>
                <Button type="submit" variant="contained" color="primary">Next</Button>
            </div>
        </form>
    </FormProvider>
    </>
  )
}

export default AdressForm;