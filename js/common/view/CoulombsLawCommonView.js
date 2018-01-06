// Copyright 2017, University of Colorado Boulder

/**
 * Parent screen view that allows for different model to view scaling for each child sim. Adds controls, checkboxes, and
 * reset buttons to the screens.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var CoulombsLawQueryParameters = require( 'COULOMBS_LAW/common/CoulombsLawQueryParameters' );
  var HSlider = require( 'SUN/HSlider' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ISLCCheckboxPanel = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCCheckboxPanel' );
  var ChargeControl = require( 'COULOMBS_LAW/common/view/ChargeControl' );
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  var ISLCGridNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCGridNode' );
  var ISLQueryParameters = require( 'INVERSE_SQUARE_LAW_COMMON/ISLQueryParameters' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Property = require( 'AXON/Property' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var charge1String = require( 'string!COULOMBS_LAW/charge1' );
  var charge2String = require( 'string!COULOMBS_LAW/charge2' );
  var scientificNotationString = require( 'string!COULOMBS_LAW/scientificNotation' );
  var showValuesString = require( 'string!COULOMBS_LAW/showValues' );

  // constants
  var MOCKUP = CoulombsLawQueryParameters.mockup;
  var SHOW_GRID = ISLQueryParameters.showGrid;

  // images
  var backgroundImage = require( 'image!COULOMBS_LAW/image06.png' );

  /**
   * @param {CoulombsLawModel} coulombsLawModel
   * @param {number} scaleFactor - multiplicative constant to distinguish between Macro and Atomic scales
   * @param {string} unitString
   * @param {number} modelViewTransformScale - allows for distinct layout scales between Macro and Atomic screens
   * @param {Tandem} tandem
   * @constructor
   */
  function CoulombsLawCommonView( coulombsLawModel, scaleFactor, unitString, modelViewTransformScale, tandem ) {

    ScreenView.call( this, { layoutBounds: new Bounds2( 0, 0, 768, 464 ) } );

    var self = this;

    var rightAlignment = this.layoutBounds.maxX - 10;
    var bottomAlignment = this.layoutBounds.maxY - 10;

    // Create the model-view transform.  The primary units used in the model are meters, so significant zoom is used.
    // The multipliers for the 2nd parameter can be used to adjust where the point (0, 0) in the model, which is
    // between the two masses.
    var modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( this.layoutBounds.width / 2, this.layoutBounds.height / 2 ),
      modelViewTransformScale
    );

    // @private
    this.modelViewTransform = modelViewTransform;

    // construct checkbox parameter lists
    var checkboxParameters = [];

    checkboxParameters.push( {
      content: showValuesString,
      property: coulombsLawModel.showValuesProperty,
      textTandemLabel: 'showValuesText',      // tandem for the label
      checkboxTandemLabel: 'showValuesCheckbox'    // tande name for checkbox node (see VerticalCheckboxGroup)
    } );

    checkboxParameters.push( {
      content: scientificNotationString,
      property: coulombsLawModel.scientificNotationProperty,
      textTandemLabel: 'scientificNotationText',
      checkboxTandemLabel: 'scientificNotationCheckbox'
    } );

    var coulombsLawParameterCheckbox = new ISLCCheckboxPanel( checkboxParameters, {
      tandem: tandem.createTandem( 'coulombsLawParameterCheckbox' ),
      fill: '#EDEDED',
      right: rightAlignment,
      bottom: bottomAlignment - 73
    } );

    this.addChild( coulombsLawParameterCheckbox );

    var charge1Control = new ChargeControl(
      charge1String,
      unitString,
      coulombsLawModel.object1.massProperty,
      coulombsLawModel.object1.valueRange,
      scaleFactor,
      tandem.createTandem( 'charge2Control' ),
      {
        right: self.layoutBounds.centerX - 5,
        top: coulombsLawParameterCheckbox.top
      }
    );

    this.addChild( charge1Control );

    var charge2Control = new ChargeControl(
      charge2String,
      unitString,
      coulombsLawModel.object2.massProperty,
      coulombsLawModel.object2.valueRange,
      scaleFactor,
      tandem.createTandem( 'charge2Control' ),
      {
        left: self.layoutBounds.centerX + 5,
        top: coulombsLawParameterCheckbox.top
      }
    );

    this.addChild( charge2Control );

    // Reset All button
    // buttons are never disposed in this sim
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        coulombsLawModel.reset();
        charge1Control.reset();
        charge2Control.reset();
      },
      radius: 18,
      right: rightAlignment,
      bottom: bottomAlignment
    } );
    this.addChild( resetAllButton );

    // accessible order of controls, charge objects will come first in subtypes
    this.accessibleOrder = [ charge1Control, charge2Control, coulombsLawParameterCheckbox, resetAllButton ];

    //------------------------------------------------
    // debugging
    //------------------------------------------------

    if ( MOCKUP ) {
      //Show the mock-up and a slider to change its transparency
      var mockupOpacityProperty = new Property( 0.00 );
      var mockImage = new Image( backgroundImage, { pickable: false } );
      mockImage.scale( this.layoutBounds.width / mockImage.width, this.layoutBounds.height / mockImage.height );
      mockupOpacityProperty.linkAttribute( mockImage, 'opacity' );
      this.addChild( mockImage );
      this.addChild( new HSlider( mockupOpacityProperty, { min: 0, max: 1 }, { top: 10, left: 10 } ) );
    }

    if ( SHOW_GRID ) {
      var gridNode = new ISLCGridNode(
        coulombsLawModel.snapObjectsToNearest,
        this.layoutBounds,
        modelViewTransform,
        { stroke: 'rgba( 250, 100, 100, 0.6 )' } );
      this.addChild( gridNode );
    }
  }

  coulombsLaw.register( 'CoulombsLawCommonView', CoulombsLawCommonView );

  return inherit( ScreenView, CoulombsLawCommonView, {

    /**
     * Animate the view.
     *
     * @param {number} dt
     */
    step: function( dt ) {

      // a11y
      this.coulombsLawRuler.step( dt );
    }
  } );
} );