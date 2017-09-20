// Copyright 2017, University of Colorado Boulder

/**
 *
 * @author $AUTHOR$
 */
define( function( require ) {
  'use strict';

  // modules
  var ChargeNode = require( 'COULOMBS_LAW/common/view/ChargeNode');
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  var CoulombsLawCommonView = require( 'COULOMBS_LAW/common/view/CoulombsLawCommonView' );
  var CoulombsLawColorProfile = require( 'COULOMBS_LAW/common/CoulombsLawColorProfile' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ISLCConstants = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCConstants' );
  var ISLCLegendNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCLegendNode' );
  var ISLCRulerNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCRulerNode' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var RichText = require( 'SCENERY/nodes/RichText' );

  // strings
  var charge1AbbreviatedString = require( 'string!COULOMBS_LAW/charge1Abbreviated' );
  var charge1String = require( 'string!COULOMBS_LAW/charge1' );
  var charge2AbbreviatedString = require( 'string!COULOMBS_LAW/charge2Abbreviated' );
  var charge2String = require( 'string!COULOMBS_LAW/charge2' );
  var pmScaleString = require( 'string!COULOMBS_LAW/pmScale' );
  var unitsAtomicLegendScaleString = require( 'string!COULOMBS_LAW/units.atomicLegendScale' );
  var unitsAtomicUnitsString = require( 'string!COULOMBS_LAW/units.atomicUnits');
  var unitsPicometersString = require( 'string!INVERSE_SQUARE_LAW_COMMON/units.picometers' );

  // constants
  var CHARGE_NODE_Y_POSITION = 205;
  var SCALE_FACTOR = 1 / ISLCConstants.coulombsPerAtomicUnit;  // number of e in one C
  var MODEL_VIEW_TRANSFORM_SCALE = 5E12;
  /**
   * @param {CoulombsLawModel} coulombsLawModel
   * @constructor
   */
  function CoulombsLawAtomicView( coulombsLawModel, tandem ) {

    CoulombsLawCommonView.call( this, coulombsLawModel, SCALE_FACTOR, unitsAtomicUnitsString, MODEL_VIEW_TRANSFORM_SCALE, tandem );

    // charge nodes added in each screen to allow for different decimal precision
    // and arrow height
    var chargeNode1 = new ChargeNode( 
      coulombsLawModel, 
      coulombsLawModel.object1, 
      this.layoutBounds, 
      this.modelViewTransform,
      tandem.createTandem( 'chargeNode1' ), 
      {
        title: charge1String,
        label: charge1AbbreviatedString,
        arrowLabelFill: CoulombsLawColorProfile.forceArrowLabelFillProperty,
        arrowFill: CoulombsLawColorProfile.forceArrowFillProperty,
        otherObjectLabel: charge2AbbreviatedString,
        defaultDirection: 'left',
        arrowColor: '#66f',
        y: CHARGE_NODE_Y_POSITION,
        forceArrowHeight: 70,
        attractNegative: true,
        forceReadoutDecimalPlaces: 9 
      } );

    var chargeNode2 = new ChargeNode( 
      coulombsLawModel, 
      coulombsLawModel.object2, 
      this.layoutBounds, 
      this.modelViewTransform,
      tandem.createTandem( 'chargeNode2' ), 
      {
        title: charge2String,
        label: charge2AbbreviatedString,
        arrowLabelFill: CoulombsLawColorProfile.forceArrowLabelFillProperty,
        arrowFill: CoulombsLawColorProfile.forceArrowFillProperty,
        otherObjectLabel: charge1AbbreviatedString,
        defaultDirection: 'right',
        arrowColor: '#f66',
        y: CHARGE_NODE_Y_POSITION,
        forceArrowHeight: 120,
        attractNegative: true,
        forceReadoutDecimalPlaces: 9
      } );

    chargeNode1.objectCircle.stroke = 'black';
    chargeNode2.objectCircle.stroke = 'black';

    this.addChild( chargeNode1 );
    this.addChild( chargeNode2 );

    // the arrows and their labels should be above both charges (and their markers) but below
    // the ruler and control panels
    this.addChild( chargeNode1.arrowNode );
    this.addChild( chargeNode2.arrowNode );

    // create and add atomic ruler
    var coulombsLawRuler = new ISLCRulerNode(
      coulombsLawModel,
      this.layoutBounds.height,
      this.modelViewTransform,
      tandem.createTandem( 'coulombsLawRuler' ),
      {
        snapToNearest: 1E-12, // in model coordinates
        majorTickLabels: [ '0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100' ],
        unitString: unitsPicometersString,
        rulerInset: 15
      }
    );

    this.addChild( coulombsLawRuler );
    // create a line the length of 1 picometer
    var legendNodeLineLength = this.modelViewTransform.modelToViewDeltaX( 10E-12 );

    var legendNode = new ISLCLegendNode( 
      legendNodeLineLength, // length of the line
      unitsAtomicLegendScaleString, // unit string
      {
        bottom: this.layoutBounds.maxY - 10,
        tandem: tandem.createTandem( 'atomicLegendNode' ) 
      } );

    legendNode.left = this.layoutBounds.minX + 10;

    this.addChild( legendNode );

    // add picometer conversion string
    var pmScaleFont = new PhetFont( 12 );
    var picometerScaleNode = new RichText( pmScaleString, {
      fill: 'rgb(0,255,0)',
      font: pmScaleFont,
      bottom: this.layoutBounds.maxY - 8,
      tandem: tandem.createTandem( 'picometerScaleString' )
    } );

    picometerScaleNode.left = legendNode.right + 10;

    this.addChild( picometerScaleNode );
  }

  coulombsLaw.register( 'CoulombsLawAtomicView', CoulombsLawAtomicView );

  return inherit( CoulombsLawCommonView, CoulombsLawAtomicView );
} );