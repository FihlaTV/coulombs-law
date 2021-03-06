// Copyright 2017-2019, University of Colorado Boulder

/**
 * Base model for all Coulombs Law sim screens. Allows for distinct instantiation details for both atomic and macro scales.
 * Inherits from the base ISLCModel that is responsible for all force calculation between the model's charge objects.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const coulombsLaw = require( 'COULOMBS_LAW/coulombsLaw' );
  const EnumerationProperty = require( 'AXON/EnumerationProperty' );
  const ForceValuesDisplayEnum = require( 'INVERSE_SQUARE_LAW_COMMON/model/ForceValuesDisplayEnum' );
  const inherit = require( 'PHET_CORE/inherit' );
  const ISLCConstants = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCConstants' );
  const ISLCModel = require( 'INVERSE_SQUARE_LAW_COMMON/model/ISLCModel' );
  const merge = require( 'PHET_CORE/merge' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2Property = require( 'DOT/Vector2Property' );

  /**
   * @param {Charge} charge1 - The left charge
   * @param {Charge} charge2 - The right charge
   * @param {Range} positionRange
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function CoulombsLawCommonModel( charge1, charge2, positionRange, tandem, options ) {

    options = merge( {
      snapObjectsToNearest: 0.1,
      displayScientificNotation: true,
      initialRulerPosition: new Vector2( 0, -1.1E-2 )
    }, options );

    // @public - the position of the ruler in the model
    this.rulerPositionProperty = new Vector2Property( options.initialRulerPosition, {
      tandem: tandem.createTandem( 'rulerPositionProperty' )
    } );

    ISLCModel.call( this, ISLCConstants.k, charge1, charge2, positionRange, tandem, options );

    // @public
    this.forceValuesDisplayProperty = new EnumerationProperty( ForceValuesDisplayEnum, ForceValuesDisplayEnum.DECIMAL, {
      tandem: tandem.createTandem( 'forceValuesDisplayProperty' ),
      phetioDocumentation: 'This determines the display type for the force values: in decimal or scientific ' +
                           'notation, and also hidden.'
    } );

    // ISLC code listens substantially to showForceValuesProperty, so keep that in sync as the display type changes.
    this.forceValuesDisplayProperty.lazyLink( newValue => {
      this.showForceValuesProperty.value = newValue === ForceValuesDisplayEnum.DECIMAL ||
                                           newValue === ForceValuesDisplayEnum.SCIENTIFIC;
    } );
  }

  coulombsLaw.register( 'CoulombsLawCommonModel', CoulombsLawCommonModel );

  return inherit( ISLCModel, CoulombsLawCommonModel, {

    /**
     * @override
     * @returns {number}
     */
    getMinForce: function() {
      return -this.getMaxForce();
    },

    /**
     * @override
     * @returns {number}
     */
    getMaxForce: function() {

      // TODO: should this call snapToGrid?
      // inherited object node accepts the entire force range. (NOTE: necessary to calculate here as Coulomb's Law allows
      // negative forces while Gravity Force Lab does not.)
      return this.calculateForce( this.object1.valueRange.max, this.object1.valueRange.max,
        this.getMinDistance( this.object1.valueProperty.get() ) ); // This assumes constant radius for Coulombs law
    },

    /**
     * Resets the model.
     *
     * @public
     */
    reset: function() {

      // As of writing this, all (both) subtypes have a rulerPositionProperty, so it is easy enough to just reset this here.
      this.rulerPositionProperty.reset();
      this.forceValuesDisplayProperty.reset();
      ISLCModel.prototype.reset.call( this );
    }
  } );
} );