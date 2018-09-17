// Copyright 2017-2018, University of Colorado Boulder

/**
 * Arrow buttons, slider and text box for editing the object value amount.
 *
 * @author  Jesse Greenberg
 * @author  Michael Barlow
 */
define( function( require ) {
    'use strict';

    // modules
    var ChargeControlSliderThumb = require( 'COULOMBS_LAW/common/view/ChargeControlSliderThumb' );
    var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
    var Dimension2 = require( 'DOT/Dimension2' );
    var inherit = require( 'PHET_CORE/inherit' );
    var ISLCObjectControlPanel = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectControlPanel' );
    var PhetFont = require( 'SCENERY_PHET/PhetFont' );
    var Property = require( 'AXON/Property' );
    var Range = require( 'DOT/Range' );

    // constants
    var TRACK_SIZE = new Dimension2( 132, 0.25 );
    var THUMB_SIZE = new Dimension2( 10, 18 );

    /**
     * @param {string} titleString
     * @param {string} unitString - for the NumberControl readout
     * @param {Property.<number>} objectProperty - the number Property associated with the ISLCObject
     * @param {Range} valueRange - max and min values for the object property, used for display and as NumberControl argument
     *     // REVIEW: Use Property instead of property in "object property" above
     * @param {number} scaleFactor - multiplicative constant for getting proper readouts/positions on Macro and Atomic screens
     * @param {Tandem} tandem // TODO: move to options // REVIEW: Handle todo
     * @param {Object} options
     * @constructor
     */
    function ChargeControl( titleString, unitString, objectProperty, valueRange, scaleFactor, tandem, options ) {

      options = _.extend( {

        // panel options
        align: 'center',

        numberControlOptions: {
          arrowButtonScale: 0.5,
          thumbSize: THUMB_SIZE,
          trackSize: TRACK_SIZE,
          titleFont: new PhetFont( 16 ),
          valueFont: new PhetFont( 12 ),
          valueXMargin: 4,
          valueYMargin: 2,
          additionalTicks: [ { value: 0, tandemLabel: 'majorTickZeroLabel' } ]
        },

        tandem: tandem
      }, options );

      // @public
      // intermediate property to allow for scaling between atomic units and microcoulombs
      // value ranges from -10 to 10 and unit can be e or mc
      // REVIEW: Use Property instead of property in above comment
      // REVIEW: Type doc? Consider using numberProperty
      this.chargeControlProperty = new Property( objectProperty.get() * scaleFactor );

      // no unlinking/disposing required as property is never destroyed
      // REVIEW: Use Property instead of property in above comment
      this.chargeControlProperty.link( function( value ) {
        objectProperty.set( value / scaleFactor );
      } );

      var chargeControlRange = new Range( valueRange.min * scaleFactor, valueRange.max * scaleFactor );

      // add custom thumb to the slider
      // REVIEW: Move to options above. May be a duplicate of TODO statement below.
      options.numberControlOptions.thumbNode = new ChargeControlSliderThumb( objectProperty, _.extend( {}, options,
        { tandem: options.tandem.createTandem( 'chargeControlsSliderThumb' ) } ) );
      options.tandem = tandem; // TODO: pass through in options in the first place

      ISLCObjectControlPanel.call( this, titleString, unitString, this.chargeControlProperty, chargeControlRange, options );
    }

    coulombsLaw.register( 'ChargeControl', ChargeControl );

    return inherit( ISLCObjectControlPanel, ChargeControl, {

      // @public
      reset: function() {
        this.chargeControlProperty.reset();
      }
    } );
  }
);