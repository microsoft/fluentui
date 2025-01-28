Most v9 components wrapper is structured like this.

    export  const  Button:  ForwardRefComponent<ButtonProps> =  React.forwardRef((props, ref) => {

    const  state  =  useButton_unstable(props, ref);

    useButtonStyles_unstable(state);
    useCustomStyleHook_unstable('useButtonStyles_unstable')(state);

    return  renderButton_unstable(state);

    }) as  ForwardRefComponent<ButtonProps>;

The pertinant lines are where styles are calculated:

    useButtonStyles_unstable(state);
    useCustomStyleHook_unstable('useButtonStyles_unstable')(state);

The default styles `useButtonStyles_unstable` are calculated, and are packaged with every Fluent component.

`useCustomStyleHook_unstable` reaches into a CustomStyleHook provider if it exists, and calculates any styles that match the component type.

For example an App.tsx might look like:

    <FluentProvider  theme={webLightTheme}>
        <div  className={styles.app}>
    	    <Button>I am a Vanilla Fluent Button</Button>
    	    <CustomStyleHooksProvider_unstable  value={FancyCustomStyleHooks}>
    		    <Button  icon={<AlertRegular/>}>
    			    I am a *Fancy* Button
    		    </Button>
    	    </CustomStyleHooksProvider_unstable>
        </div>
    </FluentProvider>

To get here, teams will have to do just a little scaffolding first:

Define a useFancyButtonStyles.ts, and build out a style calculation similar to how you'd define the style for any other Fluent component.

    const  useStyles  =  makeStyles({
        root: {
    	    // These are all unique to Fancy theme.
    	    border:  '2px solid green',
    	    backgroundColor:  'pink',
    	    borderRadius:  '64px',
        },
        icon: {
    	    color:  'blue',
    	    backgroundColor:  'white',
        }
    });

    export  const  useFancyButtonStyles  = (state:  unknown) => {
        const  buttonState  =  state  as  ButtonState;
        const  styles  =  useStyles();
        buttonState.root.className  =  mergeClasses(buttonState.root.className, styles.root);

        if (buttonState.icon) {
    	    buttonState.icon.className  =  mergeClasses(buttonState.icon.className, styles.icon);
        }
    };

Define the provider in FancyAppCustomStyleHooksValue.ts:

    export  const  FancyCustomStyleHooks:  CustomStyleHooksContextValue  = {
    	useButtonStyles_unstable:  useFancyButtonStyles
    	// ... more component styles as needed for your theme.
    };

And finally add that value to the custom style hook provider near the root of the app:

    <FluentProvider  theme={webLightTheme}>
    	<CustomStyleHooksProvider_unstable  value={FancyCustomStyleHooks}>
    		//... app code
    	</CustomStyleHooksProvider_unstable>
    </FluentProvider>

One of the caveats is that Fluent components can only reach to their most recent ancestor for custom style hooks. The system does not provide any automatic merging by design. Apps can and should be making the best decisions for their apps on which styles to apply when and how. If apps have their own custom style hooks and want to adopt others, they can gracefully merge them:

    export  const  useSmancyCustomButtonStyles  = (state:  unknown) => {
        const  buttonState  =  state  as  ButtonState;

        useFancyButtonStyles(buttonState);
        // Smart comes second, so it will win where there are conflicts.
        useSmartButtonStyles(buttonState);

    };

    export  const  SmancyCustomStyleHooks:  CustomStyleHooksContextValue  = {
        useButtonStyles_unstable:  useSmancyCustomButtonStyles
    }

This way, Apps can adopt the styles they need at scale without sacrificing their own style opinions.
