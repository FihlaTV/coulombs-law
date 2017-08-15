// Copyright 2017, University of Colorado Boulder

/**
 *
 * @author $AUTHOR$
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  var CoulombsLawCommonView = require( 'COULOMBS_LAW/common/view/CoulombsLawCommonView' );
  var RangeWithValue = require('DOT/RangeWithValue'); 

  // strings
  var unitsNanocoulombsString = require( 'string!COULOMBS_LAW/units.nanocoulombs');

  // constants
  var SCALE_FACTOR = 1E9;  // number of nC in one C

  /**
   * @param {CoulombsLawModel} coulombsLawModel
   * @constructor
   */
  function CoulombsLawMacroView( coulombsLawModel, tandem ) {

    var forceArrowRange = new RangeWithValue( ( 7.7e-11 ), ( 7.5e-7 ) );

    CoulombsLawCommonView.call( this, coulombsLawModel, SCALE_FACTOR, unitsNanocoulombsString, forceArrowRange, tandem );
  }

  coulombsLaw.register( 'CoulombsLawMacroView', CoulombsLawMacroView );

  return inherit( CoulombsLawCommonView, CoulombsLawMacroView );
} );