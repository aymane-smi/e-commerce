import { TextField, Grid} from '@material-ui/core';
import { useFormContext, Controller} from 'react-hook-form';

function CostumTextField({name, label, required}) {
    const {control} = useFormContext();
  return (
    <Grid item xs={12} sm={6}>
        <Controller control={control}
                    name={name}
                    render={({field})=>(<TextField 
                            label={label}
                            {...field}
                            required={required}
                            fullWidth
                            value={field.value}
                    />)}
        />
    </Grid>
  );
}

export default CostumTextField;