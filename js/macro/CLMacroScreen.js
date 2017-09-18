// Copyright 2017, University of Colorado Boulder

/**
 *
 * @author $AUTHOR$
 */
define( function( require ) {
  'use strict';

  // modules
  var coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  var CoulombsLawMacroModel = require( 'COULOMBS_LAW/macro/model/CoulombsLawMacroModel' );
  var CoulombsLawMacroView = require( 'COULOMBS_LAW/macro/view/CoulombsLawMacroView' );
  var CoulombsLawColorProfile = require( 'COULOMBS_LAW/common/CoulombsLawColorProfile' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var macroString = require( 'string!COULOMBS_LAW/macro' );

  // images
  var macroScreenIcon = require( 'image!COULOMBS_LAW/macro_screen_icon.png' );
  
  /**
   * @constructor
   */
  function CLMacroScreen( tandem ) {

    var options = {
      backgroundColorProperty: CoulombsLawColorProfile.backgroundProperty,
      name: macroString,
      homeScreenIcon: new Image( macroScreenIcon, { tandem: tandem.createTandem( 'icon' ) } )
    };

    var macroScreenTandem = tandem.createTandem( 'coulombsLawMacroScreen' );

    Screen.call( this,
      function() { return new CoulombsLawMacroModel( macroScreenTandem.createTandem( 'model' ) ); },
      function( model ) { return new CoulombsLawMacroView( model, macroScreenTandem.createTandem( 'view' ) ); },
      options
    );
  }

  coulombsLaw.register( 'CLMacroScreen', CLMacroScreen );

  return inherit( Screen, CLMacroScreen );
} );